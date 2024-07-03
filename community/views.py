from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Post, Comment
from .forms import PostForm, CommentForm
import logging

logger = logging.getLogger(__name__)

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'post_list.html', {'posts': posts})

def post_detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    comments = post.comments.all()
    return render(request, 'post_detail.html', {'post': post, 'comments': comments})

@login_required
def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            try:
                logger.debug(f"Attempting to save post: {post.title} for user: {request.user.username}, Email: {request.user.email}")
                post.save()
                logger.debug(f"Post saved successfully with ID: {post.pk}")
                return redirect('community:post_detail', post_id=post.pk)
            except Exception as e:
                logger.error(f"Error saving post: {e}")
                return render(request, 'post_form.html', {'form': form, 'error': str(e)})
    else:
        form = PostForm()
    return render(request, 'post_form.html', {'form': form})

@login_required
def post_edit(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect('community:post_detail', post_id=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'post_form.html', {'form': form})

@login_required
def post_delete(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.method == 'POST':
        post.delete()
        return redirect('community:post_list')
    return render(request, 'post_confirm_delete.html', {'post': post})

@login_required
def comment_create(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.post = post
            comment.save()
            return redirect('community:post_detail', post_id=post.pk)
    else:
        form = CommentForm()
    return render(request, 'comment_form.html', {'form': form})

@login_required
def comment_edit(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id, user=request.user)
    if request.method == 'POST':
        form = CommentForm(request.POST, instance=comment)
        if form.is_valid():
            form.save()
            return redirect('community:post_detail', post_id=comment.post.pk)
    else:
        form = CommentForm(instance=comment)
    return render(request, 'comment_form.html', {'form': form})

@login_required
def comment_delete(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id, user=request.user)
    post_id = comment.post.pk
    if request.method == 'POST':
        comment.delete()
        return redirect('community:post_detail', post_id=post_id)
    return render(request, 'comment_confirm_delete.html', {'comment': comment})
