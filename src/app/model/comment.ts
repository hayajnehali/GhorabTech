import { ModelBase } from './base.model';
import { FilterBase } from './filter-base';
import { User, UserResult } from './user';

export class Comment extends ModelBase {
  productId?: string;
  comment?: string;
  userName?: string;
}
export class CommentResult extends ModelBase {
  productId?: string;
  comment?: string;
  userName?: string;
  isEditing: boolean = false;
}
export class CommentFilter extends FilterBase {}
