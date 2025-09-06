import mongoose from 'mongoose';

const GaleriSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true
  },
  deskripsi: {
    type: String,
    default: ''
  },
  gambar: [{
    type: String,
    required: true
  }],
  tanggal_kegiatan: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'draft'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.Galeri || mongoose.model('Galeri', GaleriSchema);