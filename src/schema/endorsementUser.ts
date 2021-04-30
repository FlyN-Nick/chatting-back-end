import { Document, Schema, model } from "mongoose";

/** Document interface for an endorsement-user pair. */
export interface endorsementUserDocument extends Document {
	/** Endorsement level of the user. */
	level: number,
	/** User id. */
	id: string
}

/** Schema for an endorsement-user pair. */ 
export const endorsementUserSchema = new Schema ({ 
	level: { 
		type: Number,
		required: true
	},
	id: {
		type: String,
		required: true,
		unique: true
	} 
});

export default model<endorsementUserDocument>('EndorsementUser', endorsementUserSchema);
    