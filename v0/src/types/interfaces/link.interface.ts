import { ELinkNames } from "~/types/enums/";

export interface ILink {
	name: ELinkNames;
	internal: boolean;
	external: boolean;
	value: string;
	modal: boolean;
	isPartOfTopLeftMenu: boolean;
	icon: string;
	active: boolean;
}
