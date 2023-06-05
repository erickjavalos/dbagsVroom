import { Router } from 'express';
const router = Router();

// /api/mint
// instantiate mint process from server
router.get('/', async (req, res) => {
  console.log('hit')
  // return good status
  res.status(200).json({
    'status' : 'yess'
  });
  // try {
  //   const userData = await User.findAll({
  //     attributes: { exclude: ['password'] },
  //     order: [['name', 'ASC']],
  //   });

  //   const users = userData.map((project) => project.get({ plain: true }));

  //   res.render('homepage', {
  //     users,
  //     // Pass the logged in flag to the template
  //     logged_in: req.session.logged_in,
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

export default router;
