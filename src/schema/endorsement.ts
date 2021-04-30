import { Document, Schema, model } from "mongoose";
import { endorsementUserDocument, endorsementUserSchema } from './endorsementUser';

/** Document interface for the endorsement tracker. */
export interface endorsementDocument extends Document {
	/** Array of endorsement-user pairs. */
	Endorsements: endorsementUserDocument[],
	/**
	 * There is only one endorsement model that gets made, 
	 * and it's set to have the id of '0',
	 * so that it makes it easy to check if there is an endorsement model already when starting up the backend.
	 */
	id: string
}

/** Schema for the endorsement tracker. */
export const endorsementSchema = new Schema ({
	Endorsements: {
		type: [endorsementUserSchema],
		required: true
	},
	id: {
		type: String,
		required: true,
		unique: true,
		default: '0'
	}
});

export default model<endorsementDocument>('Endorsement', endorsementSchema);
    