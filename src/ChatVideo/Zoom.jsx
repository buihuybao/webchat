import React, { useEffect, useState } from "react";
import { StringeeClient, StringeeVideo } from "stringee-chat-js-sdk";
import api from "./api";

const videoContainer = document.querySelector("#videos");

const Zoom = () => {
    const [userToken, setUserToken] = useState("");
    const [roomId, setRoomId] = useState("");
    const [roomToken, setRoomToken] = useState("");
    const [room, setRoom] = useState(undefined);
    const [callClient, setCallClient] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            api.setRestToken();
            const urlParams = new URLSearchParams(window.location.search);
            const roomId = urlParams.get("room");
            if (roomId) {
                setRoomId(roomId);
                await join();
            }
        };

        fetchData();
    }, []);

    const roomUrl = `https://stg-vid-call.glitch.me/?room=${roomId}`;

    const authen = () => {
        return new Promise(async (resolve) => {
            const userId = `${(Math.random() * 100000).toFixed(6)}`;
            const userToken = await api.getUserToken(userId);
            setUserToken(userToken);

            if (!callClient) {
                const client = new StringeeClient();
                client.on("authen", function (res) {
                    console.log("on authen: ", res);
                    resolve(res);
                });
                setCallClient(client);
            }
            callClient.connect(userToken);
        });
    };

    const publish = async (screenSharing = false) => {
        const localTrack = await StringeeVideo.createLocalVideoTrack(callClient, {
            audio: true,
            video: true,
            screen: screenSharing,
            videoDimensions: { width: 640, height: 360 },
        });

        const videoElement = localTrack.attach();
        addVideo(videoElement);

        const roomData = await StringeeVideo.joinRoom(callClient, roomToken);
        const room = roomData.room;

        if (!room) {
            setRoom(room);
            room.clearAllOnMethos();
            room.on("addtrack", (e) => {
                const track = e.info.track;

                console.log("addtrack", track);
                if (track.serverId === localTrack.serverId) {
                    console.log("local");
                    return;
                }
                subscribe(track);
            });

            room.on("removetrack", (e) => {
                const track = e.track;
                if (!track) {
                    return;
                }

                const mediaElements = track.detach();
                mediaElements.forEach((element) => element.remove());
            });

            roomData.listTracksInfo.forEach((info) => subscribe(info));
        }

        await room.publish(localTrack);
        console.log("room publish successful");
    };

    const createRoom = async () => {
        const room = await api.createRoom();
        const { roomId } = room;
        const roomToken = await api.getRoomToken(roomId);

        setRoomId(roomId);
        setRoomToken(roomToken);

        await authen();
        await publish();
    };

    const join = async () => {
        const roomToken = await api.getRoomToken(roomId);
        setRoomToken(roomToken);

        await authen();
        await publish();
    };

    const joinWithId = async () => {
        const roomId = prompt("Dán Room ID vào đây nhé!");
        if (roomId) {
            setRoomId(roomId);
            await join();
        }
    };

    const joinWithAll = async () => {
        const roomId = "room-vn-1-0P6C9QKX6M-1688216098780";
        if (roomId) {
            setRoomId(roomId);
            await join();
        }
    };

    const subscribe = async (trackInfo) => {
        const track = await room.subscribe(trackInfo.serverId);
        track.on("ready", () => {
            const videoElement = track.attach();
            addVideo(videoElement);
        });
    };

    const addVideo = (video) => {
        video.setAttribute("controls", "true");
        video.setAttribute("playsInline", "true");
        videoContainer.appendChild(video);
    };

    return (
        <>
            <div className="ChatVideo">
                <div className="container has-text-centered" id="app">
                    <h1 className="title-Zoom">
                        Join a Focus Room
                    </h1>
                    <h2 className="title-Zoom-2">
                        The #1 Platform to Get Work Done
                    </h2>
                    <p className="title-Zoom-3">
                        The StudyStream Method blends well-known and ancient knowledge with modern science and research. Our sessions are guided and specifically designed for students and serious workers of today.
                    </p>
                    <div className="btn-create-join">
                        <button className="button is-primary" onClick={createRoom}>
                            Create Zoom
                        </button>

                        <button className="button is-info" onClick={joinWithId}>
                            Join Zoom
                        </button>

                        {/* <button className="button is-info" onClick={() => publish(true)}>
                            Share Desktop
                        </button> */}
                    </div>
                    {roomId && (
                        <div className="info">
                            <p>
                                Room connection success!
                            </p>
                            <p>
                            Please visit the link below and send this link to your friends to join the room{" "} <br/>
                                <a href={roomUrl} target="_blank">
                                    {roomUrl}
                                </a>
                            </p>
                            <p>
                                Room Id: {roomId}{" "}
                            </p>
                        </div>
                    )}
                    <h2>
                        Join below, all rooms are open 24/7 for all!
                    </h2>
                    <p className="title-Zoom-3">
                        Looking for a place to focus and study with strangers? Try one of StudyStream's focus rooms. Open 24 hours a day — no matter what timezone or country you live in, there will always be a study room for you to work alongside other students.
                    </p>
                    <button className="button is-info-all" onClick={joinWithAll}>
                        Join Zoom For All
                    </button>
                    {/* <div className="join-zoom-all">

                    </div> */}

                </div>
                {/* <div className="container">
                    <div id="videos"></div>
                </div> */}

            </div>
        </>
    );
};

export default Zoom;
