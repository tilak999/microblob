# Microblog
> Self-contained URL based micro-blog.

### How to use
1. Visit [https://microblob.ml](https://microblob.ml) and compose a micro-blog.
2. Preview the micro-blog using the preview button at top-right.
3. Hit Publish and Share the URL.

Easy-pesy right.. :)

### How it works
When you publish your micro-blog, all the content of micro-blog are gzip-ed and converted to base64 string.<br>
This string is then added to the hash-part of the url, so when you share the URL the data contains with-in the URl.

### License
React is [MIT licensed](./LICENSE).