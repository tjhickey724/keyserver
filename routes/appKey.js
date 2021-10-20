/*
  registerApp.js -- Router for the App Registration
*/
const express = require('express');
const router = express.Router();
const AppKey = require('../models/AppKey')
const AppData = require('../models/AppData')
const User = require('../models/User')
const UserKey = require('../models/UserKey')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

const generateKey = () => {
  let x = (Math.round(Math.random()*10000000))+""
  return x
}
// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.appKeys = await AppKey.find({ownerId:req.user._id})
    res.render('appKey');
});


/* add the value in the body to the list associated to the key */
router.post('/addApp',
  isLoggedIn,
  async (req, res, next) => {
      const appKeyData =
        {name:req.body.name,
         createdAt: new Date(),
         key:generateKey(),
         ownerId: req.user._id
        }
      console.log(`appKeyData=${JSON.stringify(appKeyData,null,5)}`)
      const appKey = new AppKey(appKeyData)
      await appKey.save();
      res.redirect('/appKey')
});

router.get('/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /registerApp/remove/:itemId")
      await AppKey.remove({_id:req.params.itemId});
      res.redirect('/appKey')
});

// return all of the data for a particular userKey/appKey/valueKey
// combination
router.post('/getData',
  async (req,res,next) => {
    const userKey = req.body.userKey
    const appKey = req.body.appKey
    const valueKey = req.body.valueKey
    const mydata =
        await AppData.find(
          {valueKey:valueKey,appKey:appKey,userKey:userKey})
    console.log(`found mydata=${mydata}`)
    res.json(mydata)
  }
)

router.post('/clearData',
  async (req,res,next) => {
    const userKey = req.body.userKey
    const appKey = req.body.appKey
    const mydata =
        await AppData.deleteMany(
          {appKey:appKey,userKey:userKey})
    res.json(mydata)
  }
)


router.post('/getNewUserKey',
  async (req,res,next) => {
    const appKey = req.body.appKey
    const userKey = await new UserKey({createdAt:new Date(),})
    console.log('generated new userKey: '+userKey.id)
    await userKey.save()
    res.json({userKey:userKey.id})
  }
)

router.post('/storeData',
  async (req,res,next) => {
    const userKey = req.body.userKey
    const appKey = req.body.appKey
    const valueKey = req.body.valueKey
    const value = JSON.stringify(req.body.value)
    const appData = {
      valueKey,value,userKey,appKey,
      createdAt:new Date(),
    }
    const appDataDoc = new AppData(appData)
    await appDataDoc.save()
    res.json(appDataDoc)
  }
)





module.exports = router;
