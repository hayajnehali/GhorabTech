import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Comment, CommentFilter, CommentResult } from '@models/comment';
import { SharedModule } from '@shared/shared.module';
import { FormErrorComponent } from '@shared/component/form-error/form-error.component';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { CommentService } from '@shared/services/comment.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-comment-manage-with-list',
  standalone: true,
  imports: [SharedModule, CommonModule, FormErrorComponent],
  templateUrl: './comment-manage-with-list.component.html',
  styleUrl: './comment-manage-with-list.component.scss',
})
export class CommentManageWithListComponent extends BaseListComponent<
  Comment,
  CommentResult,
  CommentFilter
> {
  // comments = signal<CommentResult[]>([]);
  comment = new CommentResult();
  newCommentText = signal('');
  private productService = inject(ProductService);
  @Input() productId: string | null = null;
  constructor(protected commentService: CommentService) {
    super(commentService, CommentFilter);
    // this.comment.userName = 'أحمد علي';
    // this.comment.comment = 'منتج رائع جداً!';
    // this.comment.createStamp = new Date();
    // this.comment.id = '1';
    // this.comments.set([this.comment]);
  }

  addComment() {
    this.authService.runWithAuth(() => {
      if (!this.newCommentText().trim()) return;
      let newEntry: any = new Comment();
      newEntry.productId = this.productId!;
      newEntry.userName = this.authService.user()?.userName;
      newEntry.createdBy = this.authService.user()?.certserialnumber || '';
      newEntry.comment = this.newCommentText();
      this.commentService.create(newEntry).subscribe({
        next: (addedComment) => {
          if (addedComment.success) {
            newEntry.id = addedComment.data?.id;
            this.dataSource.data.push(newEntry);
            this.newCommentText.set('');
          }
        },
      });
    });
  }

  deleteComment(commentId: string) { 
    this.commentService.delete(commentId).subscribe({
      next: (result) => {
        if (result.success) {
          // 2. تحديث الواجهة الأمامية (حذف من المصفوفة المحلية)
          this.dataSource.data = this.dataSource.data.filter(
            (c) => c.id !== commentId
          );
 
        }
      },
      error: (err) => {
        this.notificationService.showError(err);
      },
    });
  }

  toggleEdit(comment: CommentResult) {
    comment.isEditing = !comment.isEditing;
  }

  saveEdit(comment: Comment, newText: string) {
    this.authService.runWithAuth(() => {
      if (!newText.trim()) return;
      comment.comment = newText;
      this.dataSource.data.find((c) => c.id === comment.id)!.comment = newText;
      this.dataSource.data.find((c) => c.id === comment.id)!.isEditing = false;
      this.commentService.update(comment).subscribe({
        next: (addedComment) => {
          // this.comments.update((prev) => [newEntry, ...prev]);
          // this.newCommentText.set('');
        },
      });
    });
  }
}
