README
======

This NodeJS application list all users and associated clients registered with
the given RhoConnect server.

Installation
------------

* Clone or download.
* Install NodeJS and npm.
* Download and install depedencies using npm:

    $ cd list-user-clients
    $ npm install

Usage
-----

    $ node list-user-clients -h host -p port -t api_token

With:

* *host* the hostname or IP address of the RhoConnect server (default: "localhost")
* *port* the port number of the RhoConnect server (default: 443)
* *api_token* the API token of the RhoConnect server (default: "my-rhoconnect-token")

