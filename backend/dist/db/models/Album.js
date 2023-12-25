"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AlbumSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artistName: { type: String, required: true },
    // artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    yearReleased: { type: Number, required: true },
    image: { type: String, required: false }, // AWS
    tracks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Track' }],
    length: { type: String, required: true, default: '0:00' },
}, { timestamps: true });
// TODO - Add Validations (ex: album title should be unique)
exports.AlbumModel = mongoose_1.default.model('Album', AlbumSchema);
//   {
//     _id: ObjectId('658906a52bf9b966b82ffcd1'),
//     title: 'Sample Album',
//     artistName: 'Sample Artist',
//     yearReleased: 2023,
//     image: 'sample_image_url',
//     tracks: [ ObjectId('65879ab961db2497c5c9a001') ]
//   }
