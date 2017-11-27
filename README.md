# algolia-wallpapers

### Some cool wallpapers to show your algolove

## Add a new wallpaper
- Add a new image on `source/images/` *it has to be a __.jpg__*
- Add the JSON related in `source/data/wallpapers.json`


And voilà!

### JSON format

```json
{
  "name": "fileName",
  "url": "images/[fileName].jpg"
}
```

## Running the site

```
$ bundle install
$ bundle exec middleman
```

## Building

```
$ bundle exec middleman build
```

set it over to the `gh-pages` branch
