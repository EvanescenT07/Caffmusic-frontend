"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KnowledgePipeline from "@/components/knowledge/pipeline";
import FeatExtactionCode from "./code/feature-extraction";

export default function KnowledgeContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-2 text-[#383838] dark:text-[#ccc]">
          Machine Learning for Music Genre Detection
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Explore the technology and algorithms behind music genre
          classification system
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 justify-center mx-auto max-w-4xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Audio Features</TabsTrigger>
          <TabsTrigger value="model">Model Architecture</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="space-y-6 max-w-4xl mx-auto px-4"
        >
          <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#383838] dark:text-[#ccc]">
                What is Music Genre Detection?
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                An introduction to automated music classification
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
              <p className="text-[#383838] dark:text-[#ccc]">
                Music genre detection is a machine learning task that involves
                automatically classifying music tracks into predefined genres
                such as Rock, Pop, Classical, Jazz, Hip Hop, and more. This
                technology analyzes audio signals to identify patterns and
                characteristics unique to each genre.
              </p>
              <p className="text-[#383838] dark:text-[#ccc]">
                This system uses deep learning techniques to process audio files
                and predict their genre with high accuracy. The model has been
                trained on thousands of labeled music samples across multiple
                genres.
              </p>
              <div className="my-6">
                <KnowledgePipeline />
              </div>

              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Key Component
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Audio preprocessing, including chunking and augmentation for
                  robust training
                </li>
                <li>
                  Feature extraction using Mel spectrograms to capture essential
                  audio characteristics
                </li>
                <li>
                  Deep convolutional neural network for accurate genre
                  classification
                </li>
                <li>
                  Post-processing by aggregating predictions from audio chunks
                  to improve reliability
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="features"
          className="space-y-6 max-w-4xl mx-auto px-4"
        >
          <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#383838] dark:text-[#ccc]">
                Audio Features Extraction
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Transform raw audio into meaningful features
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
              <p className="text-[#383838] dark:text-[#ccc]">
                Raw audio files cannot be directly fed into machine learning
                models. Instead, we extract meaningful features that capture the
                essence of the music. The most important features we use
                include:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Mel-Frequency Cepstral Coefficients (MFCCs)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      MFCCs represent the short-term power spectrum of sound,
                      based on a linear cosine transform of a log power spectrum
                      on a nonlinear mel scale of frequency.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Spectral Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Including spectral centroid, bandwidth, rolloff, and
                      contrast, which describe the shape and characteristics of
                      the audio spectrum.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Chroma Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Represents the 12 different pitch classes, providing
                      harmonic and melodic information independent of timbre.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Temporal Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Including zero-crossing rate, tempo, and rhythm patterns
                      that capture timing aspects of the music.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Feature Extraction Code
              </h3>
              <FeatExtactionCode />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
