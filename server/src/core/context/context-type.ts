import { Session, SessionData } from "express-session";
import { UserRole } from "../../models/user/model/User.model";
import { AuthorizationContext } from "../authorization/authorization-context";

export type SessionUserType = {
	id: number;
	email: string;
	role: UserRole;
	emailConfirmed?: Date;
	isActive: boolean;
	removedAt?: Date;
};

// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata
declare module "express-session" {
	export interface SessionData {
		user?: SessionUserType;
	}
}

export interface ContextType extends AuthorizationContext {
	// dataloaders: ReturnType<typeof createDataLoaders>;
	session: Session & Partial<SessionData> & { user?: SessionUserType };
}
