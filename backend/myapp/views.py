import os
import json
import csv
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.http import require_http_methods
from django.conf import settings
from .models import CommonChars
from django.views.decorators.csrf import csrf_exempt


def _get_word_counter():
    counter = {}
    # for file in os.listdir(folder_path):
    #     if file.endswith(".wav"):
    #         wordings = labels[file] if file in labels else ''
    #         for char in wordings:
    #             if char in counter:
    #                 counter[char] += 1
    #             else:
    #                 counter[char] = 1

    return counter



@require_http_methods(["GET"])
def init_csv2db(request):
    with open(f'{settings.MEDIA_ROOT}/joyo_kanji.csv', 'r', encoding='utf8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        rows = list(reader)
        for idx, row in enumerate(rows):
            if idx == 0:
                continue

            obj, created = CommonChars.objects.get_or_create(
                char=row[0],
                rank=row[1]
            )        

    return JsonResponse({"result": "created!"})



@require_http_methods(["GET"])
def get_word_count_rank(request, page):
    counter = _get_word_counter()
    
    size = 100
    limit = size
    offset = page*size

    # orderByList = ["rank", "id"]
    chars = CommonChars.objects.all().order_by("id")[offset:offset+limit]
    if chars.exists():
        res = []
        for val in chars.values("id", "rank", "char"):
            res.append({
                "id": val["id"],
                "rank": val["rank"],
                "char": val["char"],
                "freq": counter[val["char"]] if val["char"] in counter else 0
            })

        return JsonResponse({"result": res})
    else:
        return JsonResponse({"result": []})

