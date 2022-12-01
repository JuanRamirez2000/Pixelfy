from flask import Flask, session, redirect, jsonify
from flask_session import Session
from dotenv import load_dotenv
from pprint import pprint
from auth.authenticate_user import login_user, authenticate_user
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


@app.route('/api/userInfo')
def grab_user_info():
    if not authenticate_user(session):
        return redirect('/api/login')

    return jsonify()


@app.route('/api/userPLaylists')
def grab_user_playlists():
    if not authenticate_user(session):
        return redirect('/api/login')


@app.route('/api/userRecentPLays')
def grab_user_recent_plays():
    if not authenticate_user(session):
        return redirect('/api/login')


@app.route('/api/userTracks')
def grab_user_tracks():
    if not authenticate_user(session):
        return redirect('/api/login')


@app.route('/api/userTopTracks')
def grab_user_top_tracks():
    if not authenticate_user(session):
        return redirect('/api/login')
