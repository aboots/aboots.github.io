---
layout: archive
title: ""
permalink: /projects/
author_profile: true
---

<style>
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem 1.15rem;
  margin: 0.25rem 0 2rem;
}
.project-card {
  min-width: 0;
}
.project-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 10;
  margin: 0 0 0.6rem;
  background: #f3f6fa;
  border: 1px solid #e3e8ee;
  border-radius: 6px;
  overflow: hidden;
}
.project-card__media img {
  width: 100%;
  height: 100%;
  max-width: none;
  margin: 0;
  object-fit: contain;
  object-position: center;
  border-radius: 0;
}
.project-card h3 {
  margin: 0 0 0.35rem;
  padding: 0;
  border: 0;
  font-size: 1.02rem;
  line-height: 1.3;
}
.project-card h3 a {
  text-decoration: underline;
}
.project-card p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
}
@media (max-width: 980px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="project-grid">
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/llm-lab-org/CLASP"><img src="/images/projects/panel.png" alt="CLASP model panel"></a>
    <h3><a href="https://github.com/llm-lab-org/CLASP">Contrastive Language-Speech Pretraining for Multilingual Multimodal Information Retrieval</a></h3>
    <p>CLASP is a multilingual, multimodal representation model designed for audio-text information retrieval. It uses contrastive learning to bridge the gap between language and speech domains and is trained on a diverse speech-text dataset. The model sets new benchmarks in retrieval metrics across multiple languages. It created the shared embedding space for speech and text.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/RAG-based-Educational-Assistant-Chatbot"><img src="/images/projects/rag_education.png" alt="RAG-based educational assistant"></a>
    <h3><a href="https://github.com/aboots/RAG-based-Educational-Assistant-Chatbot">RAG-based Educational Assistant Chatbot</a></h3>
    <p>This is an end-to-end educational chatbot using a RAG architecture to provide reliable, country-specific guidance for students. The system features a Vue frontend, a Node.js backend, and a Python FastAPI service that leverages Sentence Transformers for embedding generation. This RAG approach ensures responses from integrated LLMs are grounded in verified documents, have memory, and also fast, effectively minimizing hallucinations.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/r2gen-rl"><img src="/images/projects/r2gen.png" alt="Automated medical report generation"></a>
    <h3><a href="https://github.com/aboots/r2gen-rl">Automated Medical Report Generation for Fundus Fluorescein Angiography Images</a></h3>
    <p>This project presents a new model for automated medical report generation from FFA images. It uses a CNN for visual feature extraction, Cross-modal Memory for feature alignment, and a reinforcement learning algorithm guided by NLG metrics for report generation.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/health_informaion_retrieval_system"><img src="/images/projects/health_retrieval.png" alt="Health information retrieval"></a>
    <h3><a href="https://github.com/aboots/health_informaion_retrieval_system">Health Information Retrieval System</a></h3>
    <p>An advanced search engine designed for efficient retrieval and organization of health and medical-related content. It uses techniques like Boolean search, TF-IDF, FastText, Transformers, and Elasticsearch models. The system features a user-friendly interface and can be deployed on online servers.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/Autonomous-Vision-Powered-Travel-Agent"><img src="/images/projects/flightAI.png" alt="Autonomous vision-powered travel agent"></a>
    <h3><a href="https://github.com/aboots/Autonomous-Vision-Powered-Travel-Agent">Autonomous Vision-Powered Travel Agent</a></h3>
    <p>This is an autonomous agent that processes natural language queries for travel planning. The agent innovatively navigates any booking website by opening a browser for the user without relying on its underlying HTML structure. It leverages a multimodal approach combining Computer Vision with an LLM to visually interpret screenshots, mimicking human cognition to extract, filter, and present flight options.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/codex-cursor-review"><img src="/images/projects/code_agent_review.svg" alt="Diagram of a main agent and a separate reviewer"></a>
    <h3><a href="https://github.com/aboots/codex-cursor-review">Code Agent Review Council</a></h3>
    <p>An instruction-driven workflow for selective, independent review between coding agents. One agent implements substantial work, and a different agent — Codex, Cursor, Claude Code, or Antigravity — reviews consequential code and experiment changes through its own CLI before the result is trusted. Explanations, typos, formatting, and other small low-risk edits skip review.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/jobnotify"><img src="/images/projects/jobnotify.svg" alt="Diagram of a Slurm queue sending one completion alert"></a>
    <h3><a href="https://github.com/aboots/jobnotify">JobNotify: Slurm Job Completion Alerts</a></h3>
    <p>Watches a Slurm queue and sends one ntfy message when a batch of jobs has finished. The checker notices jobs by itself, so agents do not register job ids. It uses only the Python standard library, and each server creates its own private ntfy topic during install.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/bias-detection"><img src="/images/projects/bias.png" alt="Bias detection and debiasing"></a>
    <h3><a href="https://github.com/aboots/bias-detection">Bias detection &amp; De‐biasing in Language Models</a></h3>
    <p>This project focuses on the detection and mitigation of various biases, such as gender and ethnic biases, in diverse language models, including those for multiple languages and multilingual models. A significant aspect of the project is the development of de-biasing techniques specifically tailored for Persian language models.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/news_classification_summarization_QA_syatem"><img src="/images/projects/news_classification.png" alt="News classification, summarization, and question answering"></a>
    <h3><a href="https://github.com/aboots/news_classification_summarization_QA_syatem">News Classification, Summarization, &amp; QA System</a></h3>
    <p>This project is a comprehensive system for Persian news analysis, equally focusing on classification, question answering, and summarization. It classifies articles using TF-IDF and transformer models, generates relevant questions and answers, and provides fine-tuned summarization of news content.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/Image-Captioning-using-Recurrent-Neural-Networks"><img src="/images/projects/image_captioning.png" alt="Automated image captioning"></a>
    <h3><a href="https://github.com/aboots/Image-Captioning-using-Recurrent-Neural-Networks">Automated Image Captioning with Recurrent Neural Networks</a></h3>
    <p>An RNN-based system that generates relevant captions for images. It utilizes pre-trained ResNet50 for image feature extraction and LSTM networks for text generation.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/resume-parser"><img src="/images/projects/resume_parser.svg" alt="Automated resume parser"></a>
    <h3><a href="https://github.com/aboots/resume-parser">Automated Resume Parser</a></h3>
    <p>A Python package, designed as an automated resume parser, extracts valuable information from multiple CVs and stores it in a CSV file. Currently supporting Persian CVs, it enhances Applicant Tracking Systems’ review capabilities.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/personal-information-hider"><img src="/images/projects/info_hider.png" alt="Personal information hider"></a>
    <h3><a href="https://github.com/aboots/personal-information-hider">Personal Information Hider</a></h3>
    <p>A Python package designed to enhance privacy by concealing personal information in text files. It uses POS tagging and regex-based solutions to effectively remove identifiable details like names, addresses, URLs, email addresses, and more.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/Drowsiness-Detection-Embedded-System"><img src="/images/projects/drowsiness.png" alt="Drowsiness detection embedded system"></a>
    <h3><a href="https://github.com/aboots/Drowsiness-Detection-Embedded-System">Drowsiness Detection Embedded System</a></h3>
    <p>This project is a real-time drowsiness detection system that uses your webcam to monitor signs of drowsiness and phone usage.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/Neural_network_from_scratch"><img src="/images/projects/nn.svg" alt="Neural network implemented from scratch"></a>
    <h3><a href="https://github.com/aboots/Neural_network_from_scratch">Neural Network Implementation from Scratch</a></h3>
    <p>This project involves the development of a neural network from scratch using NumPy, applied to the CIFAR-10 dataset for image classification.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/ML_classical_models"><img src="/images/projects/ml.png" alt="Classical machine learning models"></a>
    <h3><a href="https://github.com/aboots/ML_classical_models">Implementation of Classical Machine Learning Models</a></h3>
    <p>This project involves the implementation of three classical machine learning models: Linear Regression, Decision Tree, and SVM. The models are trained and evaluated on various datasets, with preprocessing tasks such as PCA and EDA also performed.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/text_exploration"><img src="/images/projects/text_exploration.png" alt="Text exploration"></a>
    <h3><a href="https://github.com/aboots/text_exploration">Text Exploration</a></h3>
    <p>This project involves the crawling, exploration, and analysis of text from two websites, Zoomg and Skysports, using NLP methods to extract meaningful insights.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/memoreminder"><img src="/images/projects/memoreminder.png" alt="MemoReminder"></a>
    <h3><a href="https://github.com/aboots/memoreminder">MemoReminder</a></h3>
    <p>MemoReminder is a mobile application that allows you to share and relive your best moments. It is available on both iOS and Android platforms.</p>
  </article>
  <article class="project-card">
    <a class="project-card__media" href="https://github.com/aboots/content-management"><img src="/images/projects/content_management.png" alt="Content management system"></a>
    <h3><a href="https://github.com/aboots/content-management">Content Management System</a></h3>
    <p>This project is a versatile content management system that allows you to create and manage various types of libraries (videos, music, books, pictures) and share them with your friends.</p>
  </article>
</div>
