import router from '../utils/router';

/* GET home page. */
export default router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});
