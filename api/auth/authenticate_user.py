from flask import request
from spotipy.cache_handler import FlaskSessionCacheHandler
from spotipy.oauth2 import SpotifyOAuth
from spotipy import Spotify
from typing import Union
import spotipy
import os

SPOTIFY_APP_CLIENT_SECRET = os.environ.get("SPOTIFY_APP_CLIENT_SECRET")
SPOTIFY_APP_CLIENT_ID = os.environ.get("SPOTIFY_APP_CLIENT_ID")
SPOTIFY_APP_REDIRECT_URI = os.environ.get("SPOTIFY_APP_REDIRECT_URI")

scopes = 'user-read-currently-playing,playlist-read-private, playlist-read-collaborative,user-top-read,user-read-recently-played,user-library-read'


def initialize_spotify(session) -> tuple[FlaskSessionCacheHandler, SpotifyOAuth]:
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(
        scope=scopes,
        cache_handler=cache_handler,
        show_dialog=True,
        client_id=SPOTIFY_APP_CLIENT_ID,
        client_secret=SPOTIFY_APP_CLIENT_SECRET,
        redirect_uri=SPOTIFY_APP_REDIRECT_URI)
    return [cache_handler, auth_manager]


def login_user(session) -> Union[Spotify, str]:
    cache_handler, auth_manager = initialize_spotify(session)
    try:
        # User gave authorization
        if request.args.get("code"):
            auth_manager.get_access_token(request.args.get("code"))
            return ("logged_in")

        # No user in cache
        if not authenticate_user(session):
            auth_url = auth_manager.get_authorize_url()
            return(auth_url)

        # Success
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        return(spotify)
    except Exception:
        return(f'Error with type {Exception}')


def authenticate_user(session) -> bool:
    cache_handler, auth_manager = initialize_spotify(session)
    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        return False
    return True
