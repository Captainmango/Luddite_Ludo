# README

## Luddite ludo

--- 

### Introduction

This project is a combination of ideas and concepts to practice Javascript and building an API in Rails. The premise is that you can play games of Ludo and have the turns recorded for review later. This is also a use case for using Javascript with Devise to create a json focused account creation solution. 

In case you aren't familiar with ludo, here is a video guide of the rules.

[https://www.youtube.com/watch?time_continue=3&v=lns9TeKVebY&feature=emb_logo](https://www.youtube.com/watch?time_continue=3&v=lns9TeKVebY&feature=emb_logo)

This is a very basic game, with the main focus of the project being record management between front and back end and user account creation using Javascript.

The project is built with a Rails API back end and a Javascript and HTML/CSS front end.

### Running the project

To run the project, you will need to 

```bash
$git clone
```

the repo to your machine, then:

```ruby
$bundle install
```

to install the necessary gems. To then start the web app, you can open the index.html file in your browser of choice. **Be careful though**, the app will not work unless you run the local server with the command:

```ruby
$rails server
```

once you've done this, the app will work as normal.

### Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/Captainmango/Luddite_Ludo. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Future updates

- Computer opponents logic
- Multiplayer via websockets
- Game simulations for replays
- Improved UI
