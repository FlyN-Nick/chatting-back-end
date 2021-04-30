import { Document, Schema, model } from "mongoose";

/** Document interface for a message. */
export interface messageDocument extends Document {
	/** Do I need to explain this? */
	message: string,
	/** The UID of the sender. */
	sender: string
}

/** Schema for a message. */
export const messageSchema = new Schema({
	message: {
		type: String,
		required: true
	},
	sender: {
		type: String,
		required: true
	}
});

export default model<messageDocument>('Message', messageSchema);
    