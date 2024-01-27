const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено.'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено.'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2.'],
    maxlength: [30, 'Максимальная длина поля "name" - 30.'],
    default: 'Жак-Ив Кусто',
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
