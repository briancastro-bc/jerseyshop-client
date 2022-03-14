import { Base } from "./base.interface";

export interface Advertisement extends Base {
    uid?: string;
    title?: string;
    hyperlink?: string;
    description?: string;
    time_ago?: Date;
    is_active?: boolean;
    is_public?: boolean;
    expired_date?: Date;
}