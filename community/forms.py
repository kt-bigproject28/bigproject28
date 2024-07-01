from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    POST_TYPE_CHOICES = [
        ('buy', 'Buy'),
        ('sell', 'Sell'),
        ('exchange', 'Exchange')
    ]
    post_type = forms.ChoiceField(choices=POST_TYPE_CHOICES, required=True, widget=forms.Select)

    class Meta:
        model = Post
        fields = ['title', 'content', 'post_type']
