# Chatty
A chatting web app made while learning WebScockets

## _Currently supports_

- Shows people that are online
- Send messages to selected person
- Hostory of messages
- Persistent connection

## To add features

- Add friends based on email/username
- Ability to change "profile"
- Show friends that are online
- Add timestamps for messages
- Support for files(images, videos, GIFs etc)
- Themes(dark/Light & custom themes for users)
- Live calls (WebRtc/Stream)
- Last Seen

___

# Clone and Run
1. Clone the repo
2. For Backend
- Build docker image(first navigate to server folder)
    >  docker build -t chatty_backend .
- Run the image with port mapping
    > docker run -p 3000:3000 chatty_backend
3. For client side, "npm run dev" to simply serve files
