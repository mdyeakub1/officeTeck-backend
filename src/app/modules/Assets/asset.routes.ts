import express from 'express'
import { AssetController } from './asset.controller'

const router = express.Router()

router.post('/create-asset', AssetController.createAsset)
router.get('/', AssetController.getAllAsset)
router.get('/:id', AssetController.getSingleAsset)
router.patch('/:id', AssetController.updateAsset)
router.delete('/:id', AssetController.deleteAsset)


export const AssetRoute = router