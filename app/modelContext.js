import React, { createContext, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';


export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {

    const [loadedModel, setLoadedModel] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            console.log("waiting for tf to be ready")
            await tf.ready();

            console.log("TF is successfully ready")

            const modelJson = require('../assets/model/model.json');

            const shard1 = require('../assets/model/group1-shard1of25.bin');
            const shard2 = require('../assets/model/group1-shard2of25.bin');
            const shard3 = require('../assets/model/group1-shard3of25.bin');
            const shard4 = require('../assets/model/group1-shard4of25.bin');
            const shard5 = require('../assets/model/group1-shard5of25.bin');
            const shard6 = require('../assets/model/group1-shard6of25.bin');
            const shard7 = require('../assets/model/group1-shard7of25.bin');
            const shard8 = require('../assets/model/group1-shard8of25.bin');
            const shard9 = require('../assets/model/group1-shard9of25.bin');
            const shard10 = require('../assets/model/group1-shard10of25.bin');
            const shard11 = require('../assets/model/group1-shard11of25.bin');
            const shard12 = require('../assets/model/group1-shard12of25.bin');
            const shard13 = require('../assets/model/group1-shard13of25.bin');
            const shard14 = require('../assets/model/group1-shard14of25.bin');
            const shard15 = require('../assets/model/group1-shard15of25.bin');
            const shard16 = require('../assets/model/group1-shard16of25.bin');
            const shard17 = require('../assets/model/group1-shard17of25.bin');
            const shard18 = require('../assets/model/group1-shard18of25.bin');
            const shard19 = require('../assets/model/group1-shard19of25.bin');
            const shard20 = require('../assets/model/group1-shard20of25.bin');
            const shard21 = require('../assets/model/group1-shard21of25.bin');
            const shard22 = require('../assets/model/group1-shard22of25.bin');
            const shard23 = require('../assets/model/group1-shard23of25.bin');
            const shard24 = require('../assets/model/group1-shard24of25.bin');
            const shard25 = require('../assets/model/group1-shard25of25.bin');

            const combinedWeights = [
                shard1, shard2, shard3, shard4, shard5,
                shard6, shard7, shard8, shard9, shard10,
                shard11, shard12, shard13, shard14, shard15,
                shard16, shard17, shard18, shard19, shard20,
                shard21, shard22, shard23, shard24, shard25
              ];
    
            console.log("Model files loaded. Creating model" )
    
            const loadedModel = await tf.loadGraphModel(bundleResourceIO(modelJson, combinedWeights));
            setModelLoaded(loadedModel);

            console.log("successfully created graph model");
        };
      
        loadModel();
    }, []);

    return (
        <ModelContext.Provider value={loadedModel}>
          {children}
        </ModelContext.Provider>
      );

};