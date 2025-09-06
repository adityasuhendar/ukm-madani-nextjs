import mongoose from 'mongoose';

const BeritaSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true
  },
  konten: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'draft'
  },
  tanggal_publish: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'beritas'
});

export default mongoose.models.Berita || mongoose.model('Berita', BeritaSchema);