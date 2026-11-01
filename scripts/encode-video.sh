#!/usr/bin/env bash
# Encode a source clip into the lightweight background formats used by the site.
#
#   scripts/encode-video.sh <input> <name> [start_seconds] [duration_seconds]
#
# Produces, in static/bkg/:
#   <name>.webm  VP9, 1080p, no audio   (primary, ~2-4 MB for 10 s)
#   <name>.mp4   H.264, 1080p, no audio (fallback for browsers without VP9)
#   <name>.webp  poster frame, 1280 px wide
#
# The clip is trimmed to [start, start + duration] and scaled/cropped to
# 1920x1080 at 24 fps. Keep clips short: the background loops anyway.
set -euo pipefail

input=${1:?input file}
name=${2:?output name}
start=${3:-0}
duration=${4:-10}
out=$(cd "$(dirname "$0")/.." && pwd)/static/bkg
mkdir -p "$out"

filters="scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=24,format=yuv420p"

# Constrained quality: CRF for quiet footage, a bitrate ceiling for noisy
# footage (water, grain), so no clip grows past ~3 MB for 10 s.
ffmpeg -y -v error -ss "$start" -t "$duration" -i "$input" -an -vf "$filters" \
  -c:v libvpx-vp9 -crf 38 -b:v 2M -minrate 0 -maxrate 2.4M -row-mt 1 -deadline good -cpu-used 2 \
  "$out/$name.webm"

ffmpeg -y -v error -ss "$start" -t "$duration" -i "$input" -an -vf "$filters" \
  -c:v libx264 -preset slow -crf 27 -maxrate 2.6M -bufsize 5M -profile:v high -movflags +faststart \
  "$out/$name.mp4"

ffmpeg -y -v error -ss "$start" -i "$input" -frames:v 1 -vf "$filters,scale=1280:-2" \
  -c:v libwebp -quality 70 "$out/$name.webp"

ls -la "$out/$name".{webm,mp4,webp}
