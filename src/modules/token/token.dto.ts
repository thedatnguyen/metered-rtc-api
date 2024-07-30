export class Token {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }

  isAdmin?: boolean; // By setting this property as true the user who will join the meeting using the token will become and an admin
  roomName?: string; // If you want to restrict the token to a particular room then set this property. If it is not set then global token will be created
  globalToken?: boolean; // if you want to create a global token that works across all the rooms in the app set this property to true
  name?: string; // username
  email?: string;
  meta?: string; //Any meta info you want to associate with the user, you can also pass key value pairs JSON . maxlength 1000 chars`
  externalUserId?: string; // Any external user id you want to associated with the user/token, it could the userId from your own database;
  expireUnixSec?: number; // unix time in seconds, This token is not valid after the specified time. If not specified then a token will be created that never expires
  notBeforeUnixSec?: number; //	unix time in seconds. This token is not valid before the specified time.
  ejectAfterElapsedTimeInSec?: number; //	user who joins the meeting using this token will be ejected after the specified seconds from the meeting. Suppose you want to eject the user automatically after 30 mins then you will set this value to 1800 (30 mins in seconds)
}
