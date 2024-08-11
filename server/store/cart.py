CART_SESSION_ID = 'cart'

class Cart:
    def __init__(self, request):
        self.session = request.session
        self.cart = self.session.get(CART_SESSION_ID, {})

    def __iter__(self):
        for variant_id, variant_data in self.cart.items():
            yield {
                'variant_id': variant_id,
                **variant_data
            }

    def add(self, variant, quantity):
        variant_id = str(variant.id)
        if variant_id not in self.cart:
            self.cart[variant_id] = {
                'variant_id': variant.id,
                'name': variant.print.name,
                'image': variant.print.image,
                'width': str(variant.width),
                'length': str(variant.length),
                'price': str(variant.price),
                'quantity': 0,
            }
        self.cart[variant_id]['quantity'] += quantity
        self.save()

    def remove(self, variant_id):
        variant_id = str(variant_id)
        if variant_id in self.cart:
            del self.cart[variant_id]
            self.save()

    def save(self):
        self.session[CART_SESSION_ID] = self.cart
        self.session.modified = True

    def get_cart(self):
        return self.cart
