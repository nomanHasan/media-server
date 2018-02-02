import { ITab } from './tab.model';
import { File } from './file.model';

export interface IFolderData {
    name?: string;
    tab?: ITab;
    list?: File[];
}
