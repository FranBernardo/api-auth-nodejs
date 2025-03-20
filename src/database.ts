import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_PUBLIC_URL || process.env.MONGO_URL;

const connectDB = async () => {
  try {
    if (!mongoUri) {
      throw new Error("A variável MONGO_URL ou MONGO_PUBLIC_URL não foi definida.");
    }
    await mongoose.connect(mongoUri); // Remova as opções de depreciação
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
