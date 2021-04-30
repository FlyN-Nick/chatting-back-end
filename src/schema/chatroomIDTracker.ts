import { Document, Schema, model } from "mongoose";

/** Document interface for the chatroom id tracker. */
export interface chatroomIDTrackerDocument extends Document {
	/**
	 * There is only one chatroomIDTRacker model that gets made, 
	 * and it's set to have the id of '0',
	 * so that it makes it easy to check if there is already an chatroomIDTRacker model when starting up the backend.
	 */
	id: string,
	/** All of the used chatroom ids. */
	chatRoomIDs: string[]
}

/** Schema for the tracker used for generating unique chat room ids */
export const chatroomIDTrackerSchema = new Schema ({
	id: {
		type: String,
		required: true,
		unique: true,
		default: '0'
	},
	chatRoomIDs: {
		type: [String],
		required: true,
		default: [] as String[]
	}
});

export default model<chatroomIDTrackerDocument>('ChatroomIDTracker', chatroomIDTrackerSchema);
    