This plugin will help you to tag people around you same as facebook.

With help of this plugin, you can add, edit or remove tags. Navigate to a user's profile if the user exists.

The TagPhotos.js is the Main JavaScript file which could be used for further customizations.

Index.html has some basic structure which is necessary to use this plugin so you can also maintain it after publishing it from server side.
For reference you can check view.jsp of Face portlet.

There are some functions which could help you for enhancements from your side.

1) You can pass autocomplete_url in tagsInput function, if you want to fetch users from Auto Complete then you can use this feature either leave it.

2) hitTaggedUser - This function is using tagId to get Area's title, so it can create a URL for particualr user.
					This function is calling another function UrlExists. You can pass on your own url in it.
					

					
Note : 

To maintain the UI after Publish / Done tagging you can take a reference from https://github.com/bardiavipin/Face/blob/master/face-portlet/docroot/view.jsp .

And for server side code you can take a reference from https://github.com/bardiavipin/Face/blob/master/face-portlet/docroot/WEB-INF/src/com/learn/face/controller/FaceController.java .