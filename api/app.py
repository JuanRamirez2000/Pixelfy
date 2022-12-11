from flask import Flask, session, redirect, request, jsonify
from flask_session import Session
from dotenv import load_dotenv
from pprint import pprint
from auth.authenticate_user import login_user, authenticate_user, initialize_spotify
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
    current_user = login_user(session)
    if type(current_user) is str:
        if current_user == "logged_in":
            return redirect('/api/login')
        return(jsonify({"sessionURL": current_user}))
    return(current_user.me())


@app.route('/api/sign_out')
def sign_out():
    session.pop("token_info", None)
    return redirect('/')


@app.route('/api/user_info')
def grab_user_info():
    '''
        Spotipy API Endpoint for /me (or /current_user)
    '''
    if not authenticate_user(session):
        return redirect('/api/login')
    try:
        _, auth_manager = initialize_spotify(session)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        return(spotify.me())
    except Exception:
        return (f'No user was found')


@app.route('/api/user_playlists')
def grab_user_playlists():
    '''
        Spotipy API Endpoint for /current_user_playlists
        has a limit of 50
    '''
    if not authenticate_user(session):
        return redirect('/api/login')
    try:
        limit = request.args.get("playlist_limit")
        _, auth_manager = initialize_spotify(session)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        playlists = spotify.current_user_playlists()
        return playlists

    except Exception:
        return (f'Something went wrong with grabbing user playlists')


@app.route('/api/user_recent_plays')
def grab_user_recent_plays():
    '''
        Spotipy API Endpoint for /current_user_recently_played
        has a limit of 50
    '''
    if not authenticate_user(session):
        return redirect('/api/login')

    try:
        limit = request.args.get("recents_limit")
        _, auth_manager = initialize_spotify(session)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        recents = spotify.current_user_recently_played()
        return(recents)

    except Exception:
        return (f'Something went wrong with grabbing recent plays')


@app.route('/api/user_tracks')
def grab_user_tracks():
    '''
        Spotipy API Endpoint for /current_user_saved_tracks
        has a limit of 20
    '''
    if not authenticate_user(session):
        return redirect('/api/login')

    try:
        limit = request.args.get("saved_tracks_limit")
        _, auth_manager = initialize_spotify(session)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        saved_tracks = spotify.current_user_saved_tracks()
        return(saved_tracks)

    except Exception:
        return (f'Something went wrong with grabbing saved tracks')


@app.route('/api/user_top_tracks')
def grab_user_top_tracks():
    '''
        Spotipy API Endpoint for /current_user_top_tracks
        has a limit of 20
        has a time_range of [short_term, medium_term(default), long_term]
    '''
    if not authenticate_user(session):
        return redirect('/api/login')

    try:
        limit = request.args.get("tracks_limit")
        time_range = request.args.get("time_range")
        _, auth_manager = initialize_spotify(session)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        tracks = spotify.current_user_top_tracks()
        return(tracks)

    except Exception:
        return (f'Something went wrong with grabbing top tracks')


@app.route('/api/multi_track_audio_features')
def grab_multi_track_audio_features():

    if not authenticate_user(session):
        return redirect('/api/login')

    try:
        trackURIs = list(request.args.values())
        _, auth_manager = initialize_spotify(session)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        track_audio_features = spotify.audio_features(trackURIs)

        tracks = []
        for track in track_audio_features:
            track_data = spotify.track(track['uri'])
            tracks.append({
                "trackName": track_data['name'],
                "trackPopularity": track_data['popularity'],
                "trackArtist": track_data['artists'][0]['name'],
                "trackFeatures": track,
            })

        return(jsonify(tracks))

    except Exception:
        return (f'Something went wrong grabbing the audio features')
