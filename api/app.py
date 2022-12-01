from flask import Flask, session, request, redirect, jsonify
from flask_session import Session
from dotenv import load_dotenv
from pprint import pprint
import spotipy
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DR'] = './flask_session/'
Session(app)

SPOTIFY_APP_CLIENT_SECRET = os.environ.get("SPOTIFY_APP_CLIENT_SECRET")
SPOTIFY_APP_CLIENT_ID = os.environ.get("SPOTIFY_APP_CLIENT_ID")
SPOTIFY_APP_REDIRECT_URI = os.environ.get("SPOTIFY_APP_REDIRECT_URI")

scopes = 'user-read-currently-playing,playlist-read-private, playlist-read-collaborative,user-top-read,user-read-recently-played,user-library-read'


@app.route('/api/login')
def login():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope=scopes,
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIFY_APP_CLIENT_ID,
        client_secret=SPOTIFY_APP_CLIENT_SECRET,
        redirect_uri=SPOTIFY_APP_REDIRECT_URI)
    try:
        # Step 2. Check to see if the code from spotify is in the URL
        if request.args.get("code"):
            auth_manager.get_access_token(request.args.get("code"))
            return redirect('/api/login')

        # Step 1. Check if a token was previously used.
        #        If not, then present them with a login link
        if not auth_manager.validate_token(cache_handler.get_cached_token()):
            auth_url = auth_manager.get_authorize_url()
            return(jsonify({"sessionURL": auth_url}))

        # Step 3. User signed in
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        return(spotify.me())

    except Exception:
        return(f'Error with type {Exception}')


@app.route('/api/sign_out')
def sign_out():
    session.pop("token_info", None)
    return redirect('/')


@app.route('/api/userInfo')
def grab_user_info():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope=scopes,
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIFY_APP_CLIENT_ID,
        client_secret=SPOTIFY_APP_CLIENT_SECRET,
        redirect_uri=SPOTIFY_APP_REDIRECT_URI)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return redirect('/api/login')

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return jsonify(spotify.me())
