import { GenderInterface } from "./IGender";
import { ReligionInterface } from "./IReligion";
import { StatusInterface } from "./IStatus";

export interface MemberInterface {
    ID?:                    number;
    Firstname?:             string;
    Lastname?:              string;
    Email?:                 string;
    ProfileUser?:           string;
    Password?:              string;
    Gender?: GenderInterface;
    GenderID?: number;
    Status?: StatusInterface;
    StatusID?: number;
    Religion?:  ReligionInterface 
    ReligionID?:   number;
}