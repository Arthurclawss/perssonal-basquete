from pathlib import Path

from PIL import Image, ImageDraw


ASSETS = Path(__file__).resolve().parents[1] / "public" / "assets"


def cutout(
    source: str,
    output: str,
    crop: tuple[int, int, int, int],
    bubbles: list[tuple[int, int, int, int, int]],
    erase: list[list[tuple[int, int]]] | None = None,
) -> None:
    image = Image.open(ASSETS / source).convert("RGBA").crop(crop)
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)

    for left, top, right, bottom, radius in bubbles:
        draw.rounded_rectangle((left, top, right, bottom), radius=radius, fill=255)

    for polygon in erase or []:
        draw.polygon(polygon, fill=0)

    image.putalpha(mask)
    image.save(ASSETS / output, optimize=True)


cutout(
    "testimonial-performance.jpeg",
    "testimonial-performance-cutout.png",
    (49, 31, 837, 1080),
    [(0, 0, 787, 1048, 34)],
    [[(744, 1048), (787, 996), (787, 1048)]],
)

cutout(
    "testimonial-mobility.jpeg",
    "testimonial-mobility-cutout.png",
    (34, 17, 848, 617),
    [
        (0, 0, 813, 128, 25),
        (0, 135, 813, 599, 25),
    ],
)

cutout(
    "testimonial-3.jpeg",
    "testimonial-3-cutout.png",
    (20, 0, 797, 616),
    [(0, 0, 776, 615, 24)],
)

cutout(
    "testimonial-4.jpeg",
    "testimonial-4-cutout.png",
    (49, 31, 837, 1080),
    [(0, 0, 787, 1048, 34)],
    [[(744, 1048), (787, 996), (787, 1048)]],
)

cutout(
    "testimonial-5.jpeg",
    "testimonial-5-cutout.png",
    (17, 7, 763, 659),
    [
        (0, 0, 745, 119, 20),
        (0, 125, 534, 203, 20),
        (0, 208, 745, 328, 20),
        (0, 332, 745, 452, 20),
        (0, 457, 745, 577, 20),
        (0, 582, 745, 651, 20),
    ],
)
