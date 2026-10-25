"""Python sample for checking theme colors.

Covers: imports, dataclasses, type hints, decorators, async,
f-strings, comprehensions, and regular expressions.
"""

from __future__ import annotations

import asyncio
import re
from dataclasses import dataclass, field
from enum import Enum
from functools import wraps
from typing import Callable, Iterator

# Constants
MAX_ITEMS: int = 100
TAX_RATE = 0.10
EMAIL_RE = re.compile(r"^[\w.+-]+@[\w-]+\.[a-z]{2,}$", re.IGNORECASE)


class Status(Enum):
    TODO = "todo"
    DONE = "done"


def timed(func: Callable) -> Callable:
    """Print how long the wrapped coroutine takes."""

    @wraps(func)
    async def wrapper(*args, **kwargs):
        loop = asyncio.get_running_loop()
        start = loop.time()
        result = await func(*args, **kwargs)
        print(f"{func.__name__} took {loop.time() - start:.3f}s")
        return result

    return wrapper


@dataclass
class Item:
    name: str
    price: float
    quantity: int = 1
    tags: list[str] = field(default_factory=list)
    status: Status = Status.TODO

    @property
    def total(self) -> float:
        return round(self.price * self.quantity * (1 + TAX_RATE), 2)


class Cart:
    def __init__(self) -> None:
        self._items: dict[str, Item] = {}

    def __len__(self) -> int:
        return len(self._items)

    def __iter__(self) -> Iterator[Item]:
        yield from self._items.values()

    def add(self, item: Item) -> None:
        if len(self) >= MAX_ITEMS:
            raise ValueError(f"Cart is full ({MAX_ITEMS} items)")
        self._items[item.name] = item

    def total(self) -> float:
        return sum(item.total for item in self if item.status is not Status.DONE)


@timed
async def checkout(cart: Cart, email: str) -> bool:
    if not EMAIL_RE.match(email):
        return False
    await asyncio.sleep(0.1)
    return True


if __name__ == "__main__":
    cart = Cart()
    cart.add(Item("apple", 120.0, quantity=3, tags=["fruit"]))
    cart.add(Item("coffee", 450.0))
    expensive = [i.name for i in cart if i.price > 200]
    print(f"Total: {cart.total():,.2f} / expensive={expensive}")
    print(asyncio.run(checkout(cart, "user@example.com")), None, True)
