# 🐦 TwitStats
[![license][license]][LICENSE]
[![deps][deps]][deps-url]

Add real-time stats to your Twitter bio.

## 📦 Installation

You will need to install `git` from [git-scm.com](https://git-scm.com/downloads).

Next, install Node.js from [here](https://nodejs.org/en/download/current/) (This project requires the latest current version, LTS support isn't guaranteed).

Once you're done, you can install TwitStats by cloning this repo and installing the dependencies:

```
git clone https://github.com/hugmanrique/TwitStats.git

cd TwitStats

# with npm (use this if you aren't sure)
npm i

# with yarn
yarn
```

## 📐 Configuration

### Twitter setup

Open up the new created directory and open the `config.json` file. We will need to create a Twitter API app by clicking 'Create New App' on [apps.twitter.com](https://apps.twitter.com/).

Set a name, an URL (could be your Twitter URL/Youtube channel) and a description. Next, go to the 'Keys and Access Tokens' tab and copy the Consumer Key and the Consumer Secret into the `config.json` file.

Finally, scroll down and click on 'Create my access token'. Then, copy the Access Token and the Access Token Secret into the config file.

Having problems? Check out the official Twitter guide on [application owner access tokens](https://dev.twitter.com/oauth/overview/application-owner-access-tokens).

### Basic config values

| Prop              | Type        | Default                                      | Description                                                                                                   |
| :---------------: | :---------: | :------------------------------------------: | :------------------------------------------------------------------------------------------------------------ |
| **`description`** | `{String}`  | `Your Twitter bio goes here. Subs: %ytSubs%` | The description with variables that will be replaced.                                                         |
| **`debug`**       | `{Boolean}` | `true`                                       | Whether to print additional info to the console.                                                              |
| **`interval`**    | `{Number}`  | `60000`                                      | The variable update interval in milliseconds. A low value **isn't** recommended as you will get rate limited. |

### Modules

TwitStats is based on modules which you can enable individually, here's the instructions on how to setup each one of them:

#### Youtube

YouTube requires an API key to access the Data API v3. In order to get one, first access the [Google Developers Console](https://console.developers.google.com/projectcreate?) and create a project. Specify a name, then select the newly created project on the topbar. Next, go to the 'API and Services' app by pressing the Hamburger menu on top. Click on YouTube Data API and enable it.

Next, we will need to get the API key. Expand the left sidebar and click on 'Credentials', click on 'Create Credentials' and then on 'API key'. Copy the key into the clipboard and paste it in the `config.json`. Optionally, you can click on 'Restrict key' and enable IP based access to the APIs (I recommend this).

In order to get your Channel ID, you need to access [youtube.com/account_advanced](https://www.youtube.com/account_advanced) and then copy the 'YouTube Channel ID'.

##### Variables

| Variable         | Type       | Description                                        |
| :--------------: | :--------: | :------------------------------------------------- |
| **`ytSubs`**     | `{Number}` | Number of subscribers your channel has.            |
| **`ytViews`**    | `{Number}` | Total sum of views of all your videos.             |
| **`ytComments`** | `{Number}` | Total sum of all comments left on all your videos. |
| **`ytVideos`**   | `{Number}` | Number of videos uploaded to your channel.         |

#### Minecraft Server Ping

Gets basic Minecraft server information by pinging the server. TwitStats uses [mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated) on the back, so it supports Protocol >= 47.

You will need to set the `address` to the hostname or IP, the `port` and the timeout (time to wait for a failed ping) which defaults to 3 seconds.

##### Variables

| Variable        | Type       | Description                                                          |
| :-------------: | :--------: | :------------------------------------------------------------------- |
| **`mcPlayers`** | `{Number}` | Online player count of the server.                                   |
| **`mcMax`**     | `{Number}` | Total capacity this server has.                                      |
| **`mcMotd`**    | `{String}` | MOTD of the server (includes color codes, avoid using this variable) |
| **`mcVersion`** | `{String}` | Fancy version code (`1.x.x`) this server is running.                 |

#### Twitch

Twitch requires a valid registered API application. To create one, head to [dev.twitch.tv/dashboard/apps](https://dev.twitch.tv/dashboard/apps) and register a new application (if it's your first time on dev.twitch.tv, you will be asked to authorize access to your account). Set the app's name to `TwitStats` and the URL to `http://localhost`. Once the app is created, copy the Client ID into the config file and click on `New Secret`. Then, copy the client secret into the config too.

The process of getting your own Channel ID is more complicated. First, load up your channel page (`https://twitch.tv/<username>`), next, right click on your profile picture and then click on `Inspect element`. A window will open with an `<img>` tag highlighted. Move up to the element parent and check the `data-id` attribute. Here's an example:

![Chrome developer tools element inspector](https://i.imgur.com/rCXQYAR.png)

In this case, the channel ID would be `44322889`.

Once you have it, paste it into your config file.

##### Variables

| Variable            | Type       | Description                                        |
| :-----------------: | :--------: | :------------------------------------------------- |
| **`twitchFollows`** | `{Number}` | Number of follows this channel has.                |
| **`twitchViews`**   | `{Number}` | Total number of views of this channel.             |
| **`twitchGame`**    | `{String}` | Currently playing game set by the channel's owner. |

## 🏓 Initialization

In order to start up TwitStats, create a `screen` or `tmux` session (I recommend checking out the [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-screen-on-an-ubuntu-cloud-server)'s tutorial on how to install `screen`) with `screen -S twitstats`.

Next, `cd` into the directory which contains TwitStats and then run `node src/index` or `npm start`. You're all set!

You can now exit the screen by pressing `Ctrl + A + D`. You can access it back by using `screen -x twitstats`.

## 💯 Features

#### Awesome performance
The script uses little RAM and CPU so it can be run on any VPS/dedi. You won't even notice it's running!

#### Flexible configuration
Only enable the modules you need, why bother pinging APIs that you aren't going to use?

## 📖 License

TwitStats is licensed under the [MIT License](LICENSE).


[deps]: https://david-dm.org/hugmanrique/TwitStats.svg
[deps-url]: https://david-dm.org/hugmanrique/TwitStats
[license]: https://img.shields.io/github/license/hugmanrique/TwitStats.svg