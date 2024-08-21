/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';

interface Detection {
    startTime: string;
    endTime: string;
    details: string;
    videoUrl: string;
    captionsUrl?: string;
}

interface Event {
    eventId: string;
    startTime: string;
    endTime: string;
    detections: Detection[];
}

interface EventsProps {
    events: Event[];
}

const VideoEvents: React.FC<EventsProps> = ({ events }) => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [currentDetectionIndex, setCurrentDetectionIndex] = useState(0);
    const [inputTime, setInputTime] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        console.log(eventsData, 'eventsData');
        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handleVideoEnded);
            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('ended', handleVideoEnded);
                }
            };
        }
    }, [currentEventIndex, currentDetectionIndex]);

    const handleVideoEnded = () => {
        const event = events[currentEventIndex];
        const nextDetectionIndex = currentDetectionIndex + 1;

        if (nextDetectionIndex < event.detections.length) {
            setCurrentDetectionIndex(nextDetectionIndex);
            if (videoRef.current) {
                videoRef.current.play();
            }
        } else if (currentEventIndex + 1 < events.length) {
            setCurrentEventIndex(currentEventIndex + 1);
            setCurrentDetectionIndex(0);
            if (videoRef.current) {
                videoRef.current.play();
            }
        }
    };

    const handleTagClick = (eventIndex: number) => {
        setCurrentEventIndex(eventIndex);
        setCurrentDetectionIndex(0);
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        }
    };

    const handleSetStartTime = () => {
        if (videoRef.current && inputTime) {
            const event = events[currentEventIndex];
            const detection = event.detections[currentDetectionIndex];
            const videoStartTime = new Date(detection.startTime).getTime();

            const [hours, minutes, seconds] = inputTime.split(':').map(Number);
            const now = new Date();
            const inputDateTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                hours || 0,
                minutes || 0,
                seconds || 0,
            ).getTime();

            const newTime = (inputDateTime - videoStartTime) / 1000;
            if (newTime >= 0) {
                videoRef.current.currentTime = newTime;
                videoRef.current.play();
            }
        }
    };

    const currentEvent = events[currentEventIndex];
    const currentDetection = currentEvent.detections[currentDetectionIndex];

    return (
        <div>
            <h3>Event: {currentEvent.eventId}</h3>
            <p>{currentDetection.details}</p>
            <video
                ref={videoRef}
                src={currentDetection.videoUrl}
                controls={false}
                preload="auto"
                style={{ width: '100%', maxWidth: '600px', marginLeft: '200px' }}
            >
                {currentDetection.captionsUrl && <track kind="subtitles" src={currentDetection.captionsUrl} srcLang="en" label="English" />}
            </video>
            <div style={{ marginTop: '10px', marginLeft: '200px' }}>
                {events.map((event, index) => (
                    <Button key={event.eventId} onClick={() => handleTagClick(index)} style={{ marginRight: '5px' }}>
                        {event.eventId}
                    </Button>
                ))}
            </div>
            {/* <div style={{ marginTop: '10px', marginLeft: '200px' }}>
                <Input
                    type="text"
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                    placeholder="HH:MM:SS"
                    style={{ marginRight: '10px' }}
                />
                <Button onClick={handleSetStartTime}>Set Start Time</Button>
            </div> */}
        </div>
    );
};

const eventsData: Event[] = [
    {
        eventId: 'tag1',
        startTime: '2024-08-19T00:00:00Z',
        endTime: '2024-08-19T00:02:00Z',
        detections: [
            {
                startTime: '2024-08-19T00:00:00Z',
                endTime: '2024-08-19T00:01:00Z',
                details: 'Motion detected',
                videoUrl: 'https://cdn.shotstack.io/au/v1/msgtwx8iw6/5298829e-a414-403a-9930-5adb11dba19c.mp4',
            },
            {
                startTime: '2024-08-19T01:00:00Z',
                endTime: '2024-08-19T00:02:00Z',
                details: 'Motion detected again',
                videoUrl: 'https://cdn.shotstack.io/au/v1/msgtwx8iw6/5298829e-a414-403a-9930-5adb11dba19c.mp4',
            },
        ],
    },
    {
        eventId: 'other',
        startTime: '2024-08-19T00:03:00Z',
        endTime: '2024-08-19T00:06:00Z',
        detections: [
            {
                startTime: '2024-08-19T00:03:00Z',
                endTime: '2024-08-19T01:04:00Z',
                details: 'other',
                videoUrl: 'https://cdn.shotstack.io/au/v1/msgtwx8iw6/5298829e-a414-403a-9930-5adb11dba19c.mp4',
            },
            {
                startTime: '2024-08-19T00:04:10Z',
                endTime: '2024-08-19T00:05:15Z',
                details: 'other',
                videoUrl: 'https://cdn.shotstack.io/au/v1/msgtwx8iw6/5298829e-a414-403a-9930-5adb11dba19c.mp4',
            },
            {
                startTime: '2024-08-19T00:05:10Z',
                endTime: '2024-08-19T00:06:15Z',
                details: 'other',
                videoUrl: 'https://cdn.shotstack.io/au/v1/msgtwx8iw6/5298829e-a414-403a-9930-5adb11dba19c.mp4',
            },
        ],
    },
    {
        eventId: 'tag2',
        startTime: '2024-08-19T00:06:00Z',
        endTime: '2024-08-19T00:07:00Z',
        detections: [
            {
                startTime: '2024-08-19T00:06:05Z',
                endTime: '2024-08-19T00:07:10Z',
                details: 'Another motion detected',
                videoUrl: 'https://cdn.shotstack.io/au/v1/msgtwx8iw6/5298829e-a414-403a-9930-5adb11dba19c.mp4',
            },
        ],
    },
];

const TimeLine = () => (
    <div>
        <VideoEvents events={eventsData} />
    </div>
);

export default TimeLine;
