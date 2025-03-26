export default {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: '1h'
}