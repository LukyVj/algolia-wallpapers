# algolia-wallpapers

### Some cool wallpapers to show your algolove

## Add a new wallpaper

* Add a new image on `source/images/` _it has to be a **.jpg**_
* Add the JSON related in `source/data/wallpapers.json`

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
