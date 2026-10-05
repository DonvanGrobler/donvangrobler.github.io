---
title: "Can We Stop Training EO Models Yet?"
description: "General-purpose AI models are becoming surprisingly good at looking at satellite imagery. That does not mean they have replaced the spectral, spatial and temporal measurements that make Earth observation useful."
publishedDate: 2026-10-05
tags:
  - Earth observation
  - Artificial intelligence
  - Foundation models
  - Remote sensing
featured: false
draft: false
---

Large multimodal models have become remarkably good at looking at images. That statement will hardly surprise anyone in 2026, but I have been interested in how far those capabilities extend once we move away from everyday photographs and start giving them Earth observation imagery instead.

So, in the spirit of highly rigorous scientific experimentation, I uploaded a few satellite images to ChatGPT and started asking questions. I used GPT-5.6 Sol for these tests which, given the current pace of model releases, may already sound outdated by the time you read this.

One of my tests used very-high-resolution WorldView Legion imagery of an airport that I found on the [Pacific Geomatics WorldView Legion page](https://pacgeo.com/satellite/worldview-legion/). I simply asked ChatGPT to identify and count the aircraft in the image. The result was genuinely impressive. It found almost all of them and missed only two, which is probably easier to appreciate by looking at the result than by me describing it. See if you can spot the two aircraft it missed.

<figure>
  <img src="/images/blog/can-we-stop-training-eo-models-yet/airport-chatgpt-result.png" alt="WorldView Legion airport image annotated by ChatGPT to identify and count aircraft" loading="lazy" />
  <figcaption>ChatGPT's result from the aircraft-counting experiment. It identified almost every visible aircraft but missed two.</figcaption>
</figure>

*WorldView Legion imagery © Maxar Technologies, sourced via Pacific Geomatics. AI annotations generated using ChatGPT GPT-5.6 Sol.*

I then tried something a little more difficult using satellite imagery showing burning oil storage tanks and smoke over Chernihiv, Ukraine, during the Russian invasion. The image was published by [Politico](https://www.politico.com/news/2022/04/06/satellite-russian-war-crimes-00023386) and credited to Maxar Technologies/AP Photo. This time I asked ChatGPT to identify and highlight the smoke plumes. The result was considerably less precise than the aircraft example, but it was also not completely wrong. It broadly understood what it was looking at and where much of the smoke was, even if I certainly would not use the result as a production-ready smoke mask.

<figure>
  <img src="/images/blog/can-we-stop-training-eo-models-yet/smoke-chatgpt-result.png" alt="Satellite image annotated by ChatGPT to identify smoke plumes near Chernihiv, Ukraine" loading="lazy" />
  <figcaption>ChatGPT's attempt to identify the smoke plumes. Broadly correct, but not something I would call a reliable smoke mask.</figcaption>
</figure>

*Satellite imagery © Maxar Technologies/AP Photo, sourced via Politico. AI annotations generated using ChatGPT GPT-5.6 Sol.*

These are obviously not benchmarks. They are two fairly mediocre experiments carried out by one curious EO practitioner, and I would not calculate any meaningful performance statistics from them. Interestingly, though, they echo earlier and much more rigorous research rather nicely. Zhang and Wang's 2024 paper [*Good at Captioning, Bad at Counting: Benchmarking GPT-4V on Earth Observation Data*](https://openaccess.thecvf.com/content/CVPR2024W/EarthVision/html/Zhang_Good_at_Captioning_Bad_at_Counting_Benchmarking_GPT-4V_on_Earth_CVPRW_2024_paper.html) found that GPT-4V was already quite capable of understanding and describing EO scenes while struggling much more with tasks such as precise localisation and counting. My aircraft example certainly suggests that this capability has moved forward since then, although one successful example is nowhere near enough to say by how much.

Still, the result made me wonder how far away we actually are from simply not needing to train custom EO models anymore. Could we eventually hand raw Earth observation data to a general-purpose model, describe what we want in natural language and get the result back without needing a labelled dataset, task-specific architecture or long training pipeline?

For now, I do not think we are there. The reason is not simply that ChatGPT needs to become a bit better at drawing the smoke boundary. The more important issue is that Earth observation is fundamentally about much more than understanding what an image looks like.

## An EO image is not really just an image

There is an important distinction to make first. When I uploaded these examples to ChatGPT, I was testing the image capabilities of a general-purpose multimodal model rather than an EO-specific model. I also use the term "zero-shot" fairly loosely here. What I mean is that I did not provide any task-specific examples, labelled training data or fine-tuning. I obviously cannot claim that the underlying proprietary model has never encountered satellite imagery, aircraft or wildfires during its training.

More importantly, what I gave ChatGPT was not really the raw EO measurement. I gave it a rendered image that had already been transformed into something suitable for human eyes. This is where Earth observation starts to diverge quite dramatically from ordinary image recognition. A satellite sensor does not simply take a photograph of the Earth. Depending on the instrument, it might measure reflected or emitted electromagnetic radiation across different wavelengths, microwave backscatter, surface temperature, elevation or other physical properties. When we reduce all of that information to an RGB JPEG, we have already decided which parts of the measurement the model is allowed to see.

This matters because one of the real strengths of EO is precisely our ability to look beyond what humans can see. Healthy and stressed vegetation can behave differently in the near infrared even when they appear similar in RGB. Water, snow, burned areas, soils and minerals all have spectral characteristics that can help us distinguish features that might otherwise look remarkably similar.

There is a reason our industry did not stop with red, green and blue measurements. We moved towards richer multispectral observations and then towards hyperspectral instruments with many much narrower spectral bands because different parts of the electromagnetic spectrum allow us to measure different properties of the Earth. That does not mean that every additional band automatically makes a model better. Some bands are correlated, others can be noisy, and hyperspectral imagery introduces substantial complexity of its own. There is an entire field of feature selection around identifying which bands or combinations of bands actually contribute the most useful information for a particular task. The more defensible point is simply that different parts of the spectrum contain different physical information. Once I have compressed those measurements into a three-channel screenshot, even the smartest vision model cannot recover information that I never gave it.

The same argument becomes even clearer once we move beyond optical imagery. Consider ship detection using Sentinel-1. A SAR image does not look remotely as intuitive as my very-high-resolution airport example, yet radar can be extremely useful for detecting vessels because it measures microwave backscatter rather than visible light. It can also acquire observations at night and through cloud. [ESA has demonstrated this kind of maritime monitoring](https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1/Tracking_maritime_traffic) by combining Sentinel-1 observations with AIS information, where radar detections can reveal vessels even when they are not broadcasting their position.

Spatial resolution matters here as well, although I do not think it is really a question of EO models being better than general vision models. My airport test is simply a very favourable case because the resolution is high enough that an aircraft actually looks like an aircraft. It has wings, a fuselage and recognisable geometry. As the spatial resolution becomes coarser, objects occupy fewer pixels, mixed pixels become more common and eventually some features are no longer resolved at all. No model can reliably recover physical information that the sensor never captured in the first place.

What makes EO interesting is that we can work with different sensors, wavelengths, resolutions and acquisition strategies depending on the physical phenomenon we are trying to observe. That is quite a different problem from simply becoming better at recognising objects in photographs.

## This is where geospatial foundation models become interesting

Once we acknowledge that difference, the recent move towards geospatial and remote-sensing foundation models starts to make a lot of sense. General computer-vision models showed just how powerful large-scale pretraining can be, so the natural next step was to apply the same idea to the actual characteristics of Earth observation rather than treating satellite data as slightly unusual photographs.

There is already a growing family of models exploring this in different ways, and each makes its own trade-offs. [Prithvi](https://huggingface.co/ibm-nasa-geospatial) works with EO observations across space and time and has been developed specifically around geospatial data. [AnySat](https://openaccess.thecvf.com/content/CVPR2025/html/Astruc_AnySat_One_Earth_Observation_Model_for_Many_Resolutions_Scales_and_CVPR_2025_paper.html) takes the idea in another direction by aiming to work across different resolutions, scales and modalities. [Clay](https://clay-foundation.github.io/model/release-notes/specification.html) includes information such as sensor wavelengths, spatial resolution, location and acquisition time alongside the imagery itself. [TerraMind](https://openaccess.thecvf.com/content/ICCV2025/html/Jakubik_TerraMind_Large-Scale_Generative_Multimodality_for_Earth_Observation_ICCV_2025_paper.html) goes further into multimodal EO and learns across several different geospatial data types. There are many others, and there is no single foundation model that has suddenly solved Earth observation.

I think this work is exciting because it changes the starting point. Instead of collecting thousands of labels and training a new model from scratch every time we encounter a slightly different EO problem, we can increasingly start from a representation that has already learned useful patterns from very large EO datasets. That could significantly reduce the amount of bespoke model development needed for certain applications. At the same time, I think we should be careful not to replace one hammer with another.

Geospatial foundation models and Earth embeddings are not a holy grail. Their usefulness still depends on the sensors they were trained on, how the data were represented, the spatial and temporal scales involved and what information the downstream task actually requires. Compressing complex EO observations into an embedding is useful precisely because we reduce the data into a manageable representation, but reduction inevitably means making decisions about which information gets preserved and which gets lost.

That becomes important when we start using embeddings for tasks such as semantic search or similarity analysis. A patch-level embedding may be extremely useful for finding places that look or behave similarly, while at the same time being a poor replacement for a pixel-level product when exact boundaries matter. Likewise, if temporal information is aggregated over a long period, the representation may become very good at describing the general character of a place while smoothing over the short-lived event we were actually interested in detecting. In other words, EO foundation models are an important step forward, but they do not remove the need to understand the measurement or the question we are trying to answer.

## Space and time still deserve special treatment

There is another part of this development that I think deserves attention, and that is the recent work by the team at LGND. Some of the people behind LGND were also involved in developing Clay, and their work with [Strabo](https://lgnd.ai/resources/strabo) addresses a slightly different part of the problem.

An embedding can tell us that two places are semantically similar, but Earth observations also exist somewhere and at some point in time. An airport in Austria and an airport in South Africa might occupy similar parts of an embedding space because the imagery contains similar structures, but they are obviously not interchangeable observations. The same is true temporally because two observations of exactly the same place can mean very different things depending on when they were acquired.

Strabo is interesting because LGND is making space and time first-class parts of geospatial similarity and retrieval rather than treating them simply as filters that sit around a conventional vector search. I think that is useful work because it addresses something fundamental about our industry. Geography is not just another metadata field attached to an image and neither is time.

It does not solve every problem with embeddings, nor does it restore information that was discarded when those embeddings were created, but it is a good example of the EO community starting to address some of the limitations that appear when techniques developed for general AI are brought into a fundamentally spatial and temporal domain.

## Looking right and measuring correctly are not the same thing

All of this brings me back to the smoke example because I think it demonstrates another important distinction. The result looked plausible, and for a quick visual interpretation that is already impressive and potentially useful. If I wanted an operational EO product, however, I would need considerably more. I would want to know exactly where the smoke boundary is, how confident I am in that boundary, how reliably the method separates smoke from cloud or haze and whether I can reproduce that result across different images and atmospheric conditions.

The same applies to flood mapping, burned-area detection, crop stress, damaged buildings or almost any other EO product. Once I want to calculate hectares affected, buildings damaged or people exposed, "that looks about right" stops being a particularly useful validation metric.

The aircraft example makes the same point in a slightly different way. Missing two aircraft in my casual experiment is still incredibly impressive. Missing even one aircraft in an operational system where the requirement is to account for every aircraft could be a significant failure. Whether something is "good enough" therefore depends heavily on the purpose of the analysis.

I think this is the distinction that matters most in the whole discussion. Image understanding and EO measurement are closely related, but they are not the same task. A general-purpose multimodal model can be extremely impressive at recognising and reasoning about what is visible in an image without necessarily being the right tool for producing a scientifically defensible EO data product.

## So, can we stop training EO models?

Not just yet.

I do think the amount of bespoke model development required for some EO problems will decrease. Starting every new application by collecting thousands of labels and training a completely new architecture from scratch increasingly seems difficult to justify when foundation models can already provide useful representations of EO data.

However, I also do not think the future is simply one giant model into which we throw every possible satellite observation and ask for the answer. Different questions still require different measurements, resolutions, sensors, temporal windows and levels of accuracy. Foundation models compress information and bring their own assumptions and limitations, while general-purpose multimodal models still become much more comfortable once EO data have been transformed into something resembling an ordinary image.

For me, that means our role as an EO industry is not disappearing. We still need to turn spectral, radar, spatial and temporal measurements into scientifically defensible data products such as flood extent, crop condition, vessel detections, fire products, land-cover maps and change indicators. We also need to understand and validate what those products actually measure.

Where LLMs become particularly interesting is in making those EO products much easier to access and understand. Instead of requiring every user to know which sensor, spectral band, dataset or algorithm they need before they can even start asking a question, we can increasingly allow them to interact with the resulting EO information in a much more natural way. That feels like a more realistic direction than declaring the death of EO modelling because ChatGPT managed to count some aeroplanes.

My small experiment certainly convinced me that general-purpose models are getting surprisingly good at looking at the Earth, and given how quickly these systems are developing I would be foolish to pretend that I know exactly where the boundary will sit a few years from now. What it did not convince me of is that visual understanding has replaced the spectral, spatial, temporal and physical information that makes Earth observation useful in the first place.

Fortunately for those of us who enjoy this stuff, there still seems to be plenty of complexity left to work on. For the moment at least, I will be keeping my training scripts and I hope the rest of you will too.

Happy model training.
