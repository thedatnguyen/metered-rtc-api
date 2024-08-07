// import { preventUnacceptProperties } from '../../common/utils/validate.utils';
// import { PreventUnacceptableProperty } from 'src/common/decorators/validate.decorators';
export class Room {
  constructor(obj: unknown) {
    // preventUnacceptProperties(this, obj);
    // @PreventUnacceptableProperty(this, obj);
    Object.assign(this, obj);
  }
  //If not specified the room name will be auto-generated.
  roomName?: string;

  privacy?: string = `public` || `private`;

  /* unix timestamp in seconds to specify the expiry of the room. 
  Users cannot join after expiry */
  // @IsInt()
  // @Min(10)
  expireUnixSec: number;

  // Eject all the participants in the room when expireUnixSec is reached
  ejectAtRoomExp?: boolean;
  notBeforeUnixSec?: number; // Unix timestamp in seconds. Users cannot join the before this time.
  maxParticipants?: number;
  autoJoin?: boolean;
  showInviteBox?: boolean; //iframe only option. Show the invite box in the meeting room when no participants are there in the meeting. default true
  enableRequestToJoin?: boolean; // only for private meeting
  enableChat?: boolean; // iframe only option. Enable chat messages
  newChatForMeetingSession?: boolean; // iframe only option. Create a new chat room for each meeting session, if set to false chat history will persist during multiple calls. default true
  enableScreenSharing?: boolean; // iframe only option.
  joinVideoOn?: boolean; // iframe only option.  When user joins the meeting the camera will be default on
  joinAudioOn?: boolean; // iframe only option. ...
  enableRecording?: boolean; // Users can record Meeting
  ownerOnlyBroadcast?: boolean; // default false. Only admin can share camera, mic, and screen.
  recordRoom?: boolean; // Automatically record the meeting
  ejectAfterElapsedTimeInSec?: number; // Eject user after certain time from the meeting. For e.g in your application you want remove the user to be active for max 2hrs then you can set this value to 7200 (2hrs in seconds). It is a good idea to set this value to prevent people from keeping the session on for extremely long times.
  meetingJoinWebhook?: string; //When a user joins the room, a webhook will be sent to the specified url
  meetingLeftWebhook?: string; // Webhook is trigged when participant leaves the meeting.
  meetingStartedWebhook?: string; //	Webhook is trigged when a meeting session is created.
  meetingEndedWebhook?: string; //	Webhook is trigged when a meeting is ends.
  endMeetingAfterNoActivityInSec?: number; //	Time is seconds, End the meeting automatically if no one in the meeting is sharing their microphone, camera or screen. Suppose if you want to end the meeting after 5 mins if no one is sharing any device, the you would set the value of this property to 300 (5 mins in seconds)
  audioOnlyRoom?: boolean; //	When set to true, only audio/microphone can be shared in this room, and audio only pricing will be applied.
  enableComposition?: boolean; //Composition will be enabled. Composition has to be enabled for recording a composed meeting, for livestreaming and RTMP out.
  compositionLayout?: string = `grid` || `active_speaker`; //Set the layout of the composition
  recordComposition?: boolean; // When enable composition will be recorded
  enableRTMPOut?: boolean; //	When enable meeting will be stream to 3rd party service like Youtube Live, Facebook Live, Twitch etc.
  rtmpOutURL?: string; //	URL for the 3rd Party RTMP Service. For more details refer this guide: https://www.metered.ca/docs/RTMP-OUT/Streaming-The-Meeting-To-Youtube-Live.	When rtmpOut is enable then this become required
  enableLiveStreaming?: boolean; // When enabled, livestreaming via HLS will be enabled. You will get a HLS URL for the meeting
}
