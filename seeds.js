var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');
var  data = [
  {
    name: 'Cloud\'s Rest',
    image: 'https://farm6.staticflickr.com/5690/21189049244_826029f097.jpg',
    description: 'Morbi vel erat sapien. Integer eget velit sem. Vivamus nec elit porttitor, posuere nibh eu, ullamcorper nisl. Etiam sit amet neque a quam luctus venenatis. Sed volutpat eros elit, et condimentum lacus hendrerit non. Fusce nec ex nisi. Quisque sed tellus porta, gravida ipsum eget, maximus lectus. Proin luctus mattis felis at posuere. Nullam faucibus nunc lectus, in efficitur diam dignissim sed. Duis viverra ullamcorper turpis sit amet aliquet. Nunc gravida nulla magna, ac maximus felis varius eget. Suspendisse potenti. Aliquam erat volutpat. Ut luctus odio ac urna egestas, nec rhoncus enim tincidunt. Vivamus mattis enim eget malesuada tincidunt. Vestibulum quis lacinia ante, quis ultrices lectus. '
  },
  {
    name: 'Good Ol Mountain Home',
    image: 'https://farm6.staticflickr.com/5536/9831526685_34f9044e30.jpg',
    description: 'Fusce eu tristique nisl. Nulla nec porttitor diam. Aenean aliquet magna diam, id dignissim magna eleifend nec. Suspendisse in neque ac mauris auctor sollicitudin sed non sapien. In hac habitasse platea dictumst. Maecenas et dolor et enim euismod feugiat eu ut ex. Nunc ultrices placerat sodales. '
  },
  {
    name: 'The Camping Camp',
    image: 'https://farm1.staticflickr.com/336/20318981521_fdddda3930.jpg',
    description: 'Donec ornare gravida porttitor. In hac habitasse platea dictumst. Mauris porta lorem eu erat hendrerit, ut imperdiet ligula convallis. In egestas, sem a facilisis laoreet, lectus erat tempus mauris, non ullamcorper nibh quam ut leo'
  },
  {
    name: 'Tout Alors, Mon Dieu',
    image: 'https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg',
    description: 'Nam tincidunt velit tempor, luctus neque eu, tincidunt neque. Nulla quis tempus nulla, at scelerisque urna. Proin faucibus massa quis erat tincidunt, a porta nulla rhoncus'
  }
];

function seedDB(){
  //Remove all campgrounds
  Campground.remove({},function(err){
    if(err){
      console.log('err');
    }
    console.log('removed campgrounds!');
    // add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed,function(err,campground){
        if(err){
          console.log(err);
        }
        console.log('added a campground');
        // remove all comments                        added -- to remove comments
        Comment.remove({}, function(err){          // added -- to remove comments
          if(err){                                 // added -- to remove comments
            console.log(err)                       // added -- to remove comments
          }                                        // added -- to remove comments
          console.log('removed comments');         // added -- to remove comments
          // create a comment
          Comment.create(
            {
              text: 'This place is great but I wish there were internet',
              author: 'Homer'
            }, function(err,comment){
                 if(err){
                   console.log(err);
                 }
                 campground.comments.push(comment);
                 campground.save();
                 console.log('Created new comment');
               });
        });                                       // added -- to remove comments
      });           
    }); 
  });
  // add a few comments
}
module.exports = seedDB;