# Prints-by-sach

This repository contains the codebase for the PrintsBySach project (available at [https://printsbysach.com](https://printsbysach.com)), a Django-based application designed to manage and sell art prints and blog posts. The application includes models for handling prints, their variants, and associated cart functionality, as well as blog posts, tags, and comments. This README provides an overview of the core components, including models, serializers, URL routing, and frontend components.

## Models

### 1. Print

The `Print` model represents an individual art print with a name, slug, and image URL.

**Fields:**
- `name`: The name of the print.
- `slug`: A unique slug generated from the name, used in URLs.
- `image`: A URL pointing to an image of the print.

**Methods:**
- `save()`: Overrides the save method to automatically generate a slug based on the name.

**Meta Options:**
- `verbose_name`: `"Print"`
- `verbose_name_plural`: `"Prints"`
- `ordering`: Orders the prints alphabetically by name.

### 2. Variant

The `Variant` model represents different sizes of a print, including dimensions, price, and Stripe IDs for payment processing.

**Fields:**
- `print`: A foreign key linking the variant to a specific print.
- `size`: The size of the variant (e.g., Small, Medium, Large).
- `width`: The width of the variant.
- `length`: The length of the variant.
- `price`: The price of the variant.
- `stripe_product_id`: Optional field for the Stripe product ID.
- `stripe_price_id`: Optional field for the Stripe price ID.

**Methods:**
- `__str__()`: Returns a string representation combining the print name and size.

**Meta Options:**
- `verbose_name`: `"Variant"`
- `verbose_name_plural`: `"Variants"`
- `ordering`: Orders the variants by print name and width.

### 3. Cart

The `Cart` class is a session-based cart implementation.

**Methods:**
- `__init__(self, request)`: Initializes the cart based on the current session.
- `__iter__()`: Iterates over the cart items.
- `add(self, variant, quantity)`: Adds a variant to the cart or updates its quantity.
- `remove(self, variant_id)`: Removes a variant from the cart.
- `save(self)`: Saves the cart to the session.
- `get_cart(self)`: Retrieves the current cart.

### 4. Tag

The `Tag` model is used to categorize blog posts.

**Fields:**
- `name`: The name of the tag.
- `slug`: A unique slug generated from the tag name.
- `image`: A URL to an image representing the tag.
- `description`: A text description of the tag.

**Methods:**
- `save()`: Overrides the save method to automatically generate a slug if not provided.

**Meta Options:**
- `verbose_name`: `"Tag"`
- `verbose_name_plural`: `"Tags"`

### 5. Post

The `Post` model represents a blog post with a title, image, and associated tags.

**Fields:**
- `title`: The title of the post.
- `slug`: A unique slug generated from the title.
- `image`: A URL to an image associated with the post.
- `caption`: The caption or content of the post.
- `created`: The date and time the post was created.
- `tags`: Many-to-many relationship linking the post to tags.

**Methods:**
- `save()`: Overrides the save method to automatically generate a slug if not provided.

**Meta Options:**
- `verbose_name`: `"Post"`
- `verbose_name_plural`: `"Posts"`
- `ordering`: Orders the posts by creation date in descending order.

### 6. Comment

The `Comment` model allows users to leave comments on posts.

**Fields:**
- `post`: A foreign key linking the comment to a specific post.
- `author`: The name of the comment author.
- `body`: The content of the comment.
- `created`: The date and time the comment was created.

**Meta Options:**
- `verbose_name`: `"Comment"`
- `verbose_name_plural`: `"Comments"`
- `ordering`: Orders the comments by creation date in descending order.

## Django REST Framework Serializers

The application uses Django REST Framework to serialize models for API views.

### 1. VariantSerializer

Serializes the `Variant` model.

**Fields:**
- `id`
- `size`
- `width`
- `length`
- `price`

### 2. SimplePrintSerializer

Serializes the `Print` model with a simplified view.

**Fields:**
- `name`
- `slug`
- `image`

### 3. PrintSerializer

Serializes the `Print` model including its variants.

**Fields:**
- `id`
- `name`
- `slug`
- `image`
- `variants`

### 4. SimpleTagSerializer

Serializes the `Tag` model with a simplified view.

**Fields:**
- `name`
- `slug`

### 5. TagSerializer

Serializes the `Tag` model including associated posts.

**Fields:**
- `name`
- `slug`
- `image`
- `description`
- `posts`: A custom field that retrieves posts associated with the tag.

### 6. CommentSerializer

Serializes the `Comment` model.

**Fields:**
- `post`
- `author`
- `body`
- `created`

### 7. SimplePostSerializer

Serializes the `Post` model with a simplified view.

**Fields:**
- `title`
- `slug`
- `image`
- `caption`
- `created`
- `tags`

### 8. PostSerializer

Serializes the `Post` model including its tags and comments.

**Fields:**
- `id`
- `title`
- `slug`
- `image`
- `caption`
- `created`
- `tags`
- `comments`

## URL Routing

The application has defined URL patterns for navigating through prints, posts, tags, and cart functionality.

**Print Routes:**
- `/prints/`: List view of all prints.
- `/prints/<slug:slug>/`: Detail view of a specific print.

**Cart Routes:**
- `/cart/`: View the cart.
- `/cart/add/<int:variant_id>/`: Add a variant to the cart.
- `/cart/remove/<int:variant_id>/`: Remove a variant from the cart.
- `/create-checkout-session/`: Create a checkout session.

**Post Routes:**
- `/posts/`: List view of all posts.
- `/posts/<slug:slug>/`: Detail view of a specific post.

**Tag Routes:**
- `/tags/`: List view of all tags.
- `/tags/<slug:slug>/`: Detail view of a specific tag.

**Comment Routes:**
- `/comments/new/`: Create a new comment.

## React Components

The frontend of the application is built using React and styled-components.

### 1. App Component

The `App` component sets up the main routing for the application.

**Routes:**
- `/blog`: Displays the list of posts.
- `/blog/:slug`: Displays the detail view of a specific post.
- `/tags`: Displays the list of tags.
- `/tags/:slug`: Displays the detail view of a specific tag.
- `/store`: Displays the list of prints.
- `/store/:slug`: Displays the detail view of a specific print.
- `/cart`: Displays the cart view.

### 2. Cart Component

The `Cart` component manages the display and interaction with the shopping cart.

**Features:**
- Displays cart items with image, dimensions, price, and quantity.
- Allows updating item quantities.
- Provides a checkout button to initiate the Stripe checkout process.
- Handles removing items from the cart.

### 3. Loader Component

The `Loader` component displays an animated loading indicator.

