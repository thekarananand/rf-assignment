## Testing the API Endpoint

You can upload the word file at `\upload` route. Here's a command for the same.

``` bash
curl -s \
  --location 'http://<IP:PORT>/upload' \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=@<PATH TO DOCS FILE>' | jq .
```

You can parse data to `jq` to make it look better. Here's the Format of Respose.

``` json
{
  "metadata": {
    "filename": "file.docx",
    "content_type": "application/octet-stream",
    "size": 1026736
  },
  "link": "/static/file.pdf"
}
```

this link is served by Static File Server via Reverse Proxy at `\static` route.
