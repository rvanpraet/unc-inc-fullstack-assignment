from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Article

class ArticleAPITestCase(APITestCase):
    # Setup test urls and initial data
    def setUp(self):
        self.list_url = reverse('article-list-create')
        self.detail_url = lambda pk: reverse('article-detail', args=[pk])
        self.article = Article.objects.create(
            title="Demo", content="Some longer demo content for testing."
        )


    # Test GET should return list of articles
    def test_get_articles(self):
        # Setup
        response = self.client.get(self.list_url)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


    # Test POST should create a new article
    def test_create_article_valid(self):
        # Setup
        data = {'title': 'New Item', 'content': 'This is at least 20 chars.'}
        response = self.client.post(self.list_url, data, format='json')

        # Assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Item')


    # Test POST with invalid title length should fail
    def test_create_article_invalid_title(self):
        # Setup
        data = {'title': '', 'content': 'This is at least 20 chars.'}
        response = self.client.post(self.list_url, data, format='json')

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)


    # Test POST with invalid content length should fail
    def test_create_article_invalid_content(self):
        # Setup
        data = {'title': 'Valid Title', 'content': 'Short'}
        response = self.client.post(self.list_url, data, format='json')

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('content', response.data)

    # Test POST with invalid title and content length should fail
    def test_create_article_invalid_title_and_content(self):
        # Setup
        data = {'title': '', 'content': 'Short'}
        response = self.client.post(self.list_url, data, format='json')

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)
        self.assertIn('content', response.data)


    # Test PUT should update an existing article
    def test_update_article(self):
        # Setup
        data = {'title': 'Updated', 'content': 'This is updated with enough length.'}
        response = self.client.put(self.detail_url(self.article.id), data, format='json')

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated')


    # Test PUT should not update an existing article when title is invalid
    def test_update_article_invalid_title(self):
        # Setup
        data = {'title': '', 'content': 'This is updated with enough length.'}
        response = self.client.put(self.detail_url(self.article.id), data, format='json')

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)


    # Test DELETE should remove an existing article
    def test_delete_article(self):
        # Setup
        response = self.client.delete(self.detail_url(self.article.id))

        # Assert
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Article.objects.count(), 0)
