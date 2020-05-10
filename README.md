# Semantic Chat Web Server

## <a href="https://codeclimate.com/github/the-purgatory/sc-server/maintainability"><img src="https://api.codeclimate.com/v1/badges/a7e856d88d644be099cf/maintainability" /></a> ![Release Drafter](https://github.com/the-purgatory/sc-server/workflows/Release%20Drafter/badge.svg?branch=master)

### TODO

```
  user
      _id
      username
      password
      email
      phone
      bio/description
      profile_pic
      is_active
      created_at
      last_seen
      meta

  group
      _id
      owner_id
      created_at
      bio/description
      profile_pic
      members - [] of ids
      meta

  message
      _id
      transmission_type [
          0,  // direct
          1,  // multiple - group and forwarded to multiple people
          2,  // braodcast for all to their inboxes individually
          3   // story - braodcast but not to inboxes
      ]
      content
      content_type [string, audio, video, image, pdf]
      sender
      reciever - [] of ids // not required for braodcast and story
      timestamp
      expiration_time - null or timestamp // used for stories or some temporary messages like alerts
      meta

```

All the docs are referenced below -

- Read all the docs here - [sc-web wiki](https://github.com/the-purgatory/sc-server/wiki)

**Authors** -
| | Name | Ownership |
| :---------------: | --------------- | ------------ |
![NaveenJamdagani](https://avatars3.githubusercontent.com/u/27627139?s=40&v=4) | [Naveen Jamdagani](https://github.com/NaveenJamdagani) 🐙 | Mobile App & Backend
![ankushjamdagani](https://avatars2.githubusercontent.com/u/13179262?s=40&v=4) | [Ankush Jamdagani](https://github.com/ankushjamdagani) 🐸 | Web App & Backend
![rashmisangwan](https://avatars0.githubusercontent.com/u/27778168?s=40&v=4) | [Rashmi Sangwan](https://github.com/rashmisangwan) 🐼 | Data Science

`Copyright [2020] [The Purgatory]`
