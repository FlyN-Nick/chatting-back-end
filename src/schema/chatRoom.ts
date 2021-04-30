import { Document, Schema, model } from "mongoose";
import { messageDocument, messageSchema } from "./message";

/** Document interface for a chat room. */
export interface chatRoomDocument extends Document {
	/** ID of the chatroom. */
	chatRoomID: string,
	/** Array of all the sent messages (not including deleted messages). */
	messages: messageDocument[],
	/** Self-explanatory. */
	userOneID: string,
	/** Self-explanatory, 2 users per chatroom. */
	userTwoID: string
}

/** Schema for a chatroom. */
export const chatRoomSchema = new Schema ({
	chatRoomID: {
		type: String,
		required: true,
		unique: true
	}, 
	messages: {
		type: [messageSchema], 
		required: true
	}, 
	userOneID: {
		type: String,
		required: true,
		unique: true
	},
	userTwoID: {
		type: String,
		required: true,
		unique: true
	}
});

export default model<chatRoomDocument>('ChatRoom', chatRoomSchema);
    